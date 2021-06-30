---
title: 'How to set up auditing in Entity Framework Core'
date: '2021-06-26'
tags: ['asp-net-core', 'dotnet', 'entity-framework']
draft: false
summary: 'Learn how to set up simple entity auditing and track changes in Entity Framework Core.'
---

## Why entity auditing?

When building an application with a datastore, at some point it will be necessary to know who changed what data, and when. Tracking these data changes are crucial for the security and integrity of any application. This is where data auditing is necessary. Data auditing involves keeping track and storing changes made to any entities. In Entity Framework, entity auditing can easily be configured by overriding the `SaveChangesAsync` method. The rest of this blog post will detail how to do it. For demo purposes I created a .NET Core API project - check out the repository [here](https://github.com/Ngineer101/auditing-dotnet-entity-framework-core).

## How to set up auditing in Entity Framework Core

### Step 1

To get started with setting up the application, install the required NuGet packages:

- [https://www.nuget.org/packages/Microsoft.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore)
- [https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Tools](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Tools)
- [https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite) (This package will depend on the type of database used - SQL Server, PostgreSQL etc.)

### Step 2

To access the `HttpContext` during a request, add the following code to the `ConfigureServices` method in the `Startup.cs` class.

```cs
services.AddHttpContextAccessor();
```

### Step 3

Add a default `DbContext` class and inject an instance of `IHttpContextAccessor` into the constructor. The `HttpContextAccessor` service will be used to retrieve the `ClaimsPrincipal` and username claim (if any) from the `HttpContext` to determine who performed an operation. The `DefaultContext.cs` class should look like this:

```cs
public class DefaultContext : DbContext
{
    private readonly string _username;

    public DefaultContext(DbContextOptions<DefaultContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
    {
        // Get the claims principal from the HttpContext
        var claimsPrincipal = httpContextAccessor.HttpContext?.User;

        // Get the username claim from the claims principal - if the user is not authenticated the claim will be null
        _username = claimsPrincipal?.Claims?.SingleOrDefault(c => c.Type == "username")?.Value ?? "Unauthenticated user";
    }
}
```

Add the `DefaultContext.cs` class to your service container by adding the following code to the `ConfigureServices` method in the `Startup.cs` class.

```cs
services.AddDbContext<DefaultContext>(options => options.UseSqlite(Configuration.GetConnectionString("DefaultConnectionString")));
```

### Step 4

Add 2 classes:

- `Vehicle.cs` - the entity to be audited (for demo purposes). `Vehicle.cs` implements an empty interface, `IAuditable.cs`. This interface is used to determine which entities to audit. Only entities of type `IAuditable` will be audited. If this is not done you will end up with an infinite loop because the `AuditEntry` entities themselves will also be audited.

```cs
[Table(nameof(Vehicle))]
public class Vehicle : IAuditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [StringLength(100)]
    public string Type { get; set; }

    [StringLength(100)]
    public string Color { get; set; }

    [StringLength(100)]
    public string Model { get; set; }

    [StringLength(100)]
    public string Owner { get; set; }
}
```

- `AuditEntry.cs` - the entity that maps to the `dbo.AuditEntry` table where all the audit entries are stored.

```cs
[Table(nameof(AuditEntry))]
public class AuditEntry
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string EntityName { get; set; }
    public string ActionType { get; set; }
    public string Username { get; set; }
    public DateTime TimeStamp { get; set; }
    public string EntityId { get; set; }
    public Dictionary<string, object> Changes { get; set; }

    [NotMapped]
    // TempProperties are used for properties that are only generated on save, e.g. ID's
    public List<PropertyEntry> TempProperties { get; set; }
}
```

Then, add both entities as entity sets in your `DbContext` class.

```cs
public DbSet<Vehicle> Vehicles { get; set; }
public DbSet<AuditEntry> AuditEntries { get; set; }
```

_Side note: the `Changes` property for each audit entry is saved as a serialized JSON string. To achieve this, a property conversion function is configured to serialize the dictionary before saving and deserializing the string value when the entity is retrieved from the database. Add the following code in the `OnModelCreating` method in the `DefaultContext.cs` class:_

```cs
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<AuditEntry>().Property(ae => ae.Changes).HasConversion(
        value => JsonConvert.SerializeObject(value),
        serializedValue => JsonConvert.DeserializeObject<Dictionary<string, object>>(serializedValue));
}
```

Run the following commands in your Visual Studio package manager console to create and apply the first migration:

- `Add-Migration InitialCreate`
- `Update-Database`

If you are using the DotNet CLI to create and apply migrations, run the following commands:

- `dotnet ef migrations add InitialCreate`
- `dotnet ef database update`

_Note: don't forget to add your database connection string to the `appsettings.json` config file._

### Step 5

Override the `SaveChangesAsync` method in the `DefaultContext.cs` class. The overridden `SaveChangesAsync` method has 3 steps. First, get the audit entries for the entity being saved. Then, perform the actual save operation. And lastly, update the audit entries with the generated values and save it. To accomplish this add the following code to the `DefaultContext.cs` class (see comments for explanations):

```cs
public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
{
    // Get audit entries
    var auditEntries = OnBeforeSaveChanges();

    // Save current entity
    var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

    // Save audit entries
    await OnAfterSaveChangesAsync(auditEntries);
    return result;
}

private List<AuditEntry> OnBeforeSaveChanges()
{
    ChangeTracker.DetectChanges();
    var entries = new List<AuditEntry>();

    foreach (var entry in ChangeTracker.Entries())
    {
        // Dot not audit entities that are not tracked, not changed, or not of type IAuditable
        if (entry.State == EntityState.Detached || entry.State == EntityState.Unchanged || !(entry.Entity is IAuditable))
            continue;

        var auditEntry = new AuditEntry
        {
            ActionType = entry.State == EntityState.Added ? "INSERT" : entry.State == EntityState.Deleted ? "DELETE" : "UPDATE",
            EntityId = entry.Properties.Single(p => p.Metadata.IsPrimaryKey()).CurrentValue.ToString(),
            EntityName = entry.Metadata.ClrType.Name,
            Username = _username,
            TimeStamp = DateTime.UtcNow,
            Changes = entry.Properties.Select(p => new { p.Metadata.Name, p.CurrentValue }).ToDictionary(i => i.Name, i => i.CurrentValue),

            // TempProperties are properties that are only generated on save, e.g. ID's
            // These properties will be set correctly after the audited entity has been saved
            TempProperties = entry.Properties.Where(p => p.IsTemporary).ToList(),
        };

        entries.Add(auditEntry);
    }

    return entries;
}

private Task OnAfterSaveChangesAsync(List<AuditEntry> auditEntries)
{
    if (auditEntries == null || auditEntries.Count == 0)
        return Task.CompletedTask;

    // For each temporary property in each audit entry - update the value in the audit entry to the actual (generated) value
    foreach (var entry in auditEntries)
    {
        foreach (var prop in entry.TempProperties)
        {
            if (prop.Metadata.IsPrimaryKey())
            {
                entry.EntityId = prop.CurrentValue.ToString();
                entry.Changes[prop.Metadata.Name] = prop.CurrentValue;
            }
            else
            {
                entry.Changes[prop.Metadata.Name] = prop.CurrentValue;
            }
        }
    }

    AuditEntries.AddRange(auditEntries);
    return SaveChangesAsync();
}
```

Auditing of your entities is now configured. Whenever you make any changes to an entity of type `IAuditable`, you will see audit entries that reflect those changes. See the example audit entries below:

![Audit entries for vehicle](/static/images/post7/audit-entries.png)

To view the complete working example check out this repository: [https://github.com/Ngineer101/auditing-dotnet-entity-framework-core](https://github.com/Ngineer101/auditing-dotnet-entity-framework-core).
