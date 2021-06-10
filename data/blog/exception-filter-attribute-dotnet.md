---
title: 'How to configure a custom exception filter in .NET 5 web API'
date: '2021-06-10'
tags: ['asp-net-core', 'dotnet', 'web-api']
draft: false
summary: 'Learn how to handle all unhandled exceptions in an API using a custom exception filter.'
---

## Why an (exception) filter?

In ASP.NET Core filters can be used to run custom code at any stage in the request processing pipeline. Filters are an effective
way to run the same custom code for multiple requests without code duplication.

For example:

If you have multiple API endpoints, one possible way of error handling is to add a `try { } catch { }` in each endpoint to handle possible
exceptions. By doing this you will probably end up with substantial code duplication in the `catch { }` clauses, because most exceptions are
handled in a generic way (logging, creating response, returning 500, etc.)

Or, a better solution is to configure a custom exception filter that will handle all **unhandled** exceptions in a generic way
and return an appropriate response. Of course, you can still use a `try { } catch { }` for special cases where non-generic exception handling
is required.

## Configure a custom `ExceptionFilterAttribute`

### Step 1.1

Create a class called `UnhandledExceptionFilterAttribute.cs` that derives from the `ExceptionFilterAttribute.cs` class.
This class will be configured to handle all unhandled exceptions in your API.

### Step 1.2

Inject an instance of `ILogger` to log the unhandled exceptions before returning a response.

### Step 1.3

Override the `OnException` method and add your custom code to handle unhandled exceptions and create an appropriate action result.

The `UnhandledExceptionFilterAttribute.cs` class should look more or less like this:

```cs
public class UnhandledExceptionFilterAttribute : ExceptionFilterAttribute
{
    private readonly ILogger<UnhandledExceptionFilterAttribute> _logger;

    public UnhandledExceptionFilterAttribute(ILogger<UnhandledExceptionFilterAttribute> logger)
    {
        _logger = logger;
    }

    public override void OnException(ExceptionContext context)
    {
        // Customize this object to fit your needs
        var result = new ObjectResult(new
        {
            context.Exception.Message, // Or a different generic message
            context.Exception.Source,
            ExceptionType = context.Exception.GetType().FullName,
        })
        {
            StatusCode = (int)HttpStatusCode.InternalServerError
        };

        // Log the exception
        _logger.LogError("Unhandled exception occurred while executing request: {ex}", context.Exception);

        // Set the result
        context.Result = result;
    }
}
```

### Step 2

Register your custom filter by adding the following code in the `ConfigureServices` method in the `Startup.cs` class.

```cs
services.AddControllers(options =>
{
    options.Filters.Add<UnhandledExceptionFilterAttribute>();
});
```

Now, whenever an exception occurs that is not caught by a `catch` clause, the `OnException` method will be executed
and your custom response will be returned.
