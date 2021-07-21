---
title: 'What is the difference between DateTime.UtcNow and DateTime.Now in .NET?'
date: '2021-07-20'
tags: ['asp-net-core', 'dotnet']
draft: false
summary: 'Learn the difference between DateTime.UtcNow and DateTime.Now and when to use what.'
---

## The difference

`DateTime.UtcNow` is the time according to the **Coordinated Universal Time** standard and is the same across timezones. This means that `DateTime.UtcNow` has the same value in the _GMT +2_ timezone and in the _GMT -7_ timezone and all other timezones.

`DateTime.Now` is the current time in the timezone where the code is executed. This means that `DateTime.Now` in the _GMT +2_ timezone will be 2 hours ahead of `DateTime.UtcNow`.

A time comparison is shown in the table (assuming the day, month, and year remains constant):

| Timezone          | _GMT +0_ | _GMT +1_ | _GMT +2_ | _GMT +3_ | _GMT +4_ | _GMT +5_ | _GMT +6_ |
| ----------------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| `DateTime.UtcNow` | 12:00    | 12:00    | 12:00    | 12:00    | 12:00    | 12:00    | 12:00    |
| `DateTime.Now`    | 12:00    | 13:00    | 14:00    | 15:00    | 16:00    | 17:00    | 18:00    |

## When to use `DateTime.UtcNow`

When storing date and time in a database it is recommended to use `DateTime.UtcNow`. By doing this, the time and date values will be standardized throughout your app and independent of the timezones your servers or users might be in.

## When to use `DateTime.Now`

When displaying date and time to a user it is recommended to use `DateTime.Now`. This will ensure that the correct time for the user's timezone is displayed. `C#` also has a handy extension, `.ToLocalTime()`, that can be used to convert `DateTime.UtcNow` to local time.

---

_P.S._ - `DateTime.Now` is slightly slower than `DateTime.UtcNow` because `DateTime.Now` uses `DateTime.UtcNow` internally and calculates the correct time based on the timezone. The difference in performance is negligible for most systems, but if your app does **A LOT** of time based calculations it is recommended to use `DateTime.UtcNow` to avoid unnecessary performance overhead.
