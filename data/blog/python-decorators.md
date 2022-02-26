---
title: Python Decorators in 5 Minutes
date: 2021-07-31
tags: ['software', 'python']
draft: false
summary: The only decorator article you'll need to read
---

Decorators are a **"syntactic sugar"** for a **function that takes another function as an argument**.

_Usually_ the thing returned is another function, but it technically doesn't have to be.

Functions that take functions as arguments and return functions are referred to as **higher-order functions**.

```python
@some_decorator
def foo():
    ...

# is equivalent to...

def foo():
    ...

foo = some_decorator(foo)
```

Decorators are often used in frameworks like [Flask][flask] and [FastAPI][fastapi] to create productive high-level abstractions.

Learning to write them can seem overwhelming at first, but once you grok the concept, writing decorators will become natural.

Just be careful not to abuse the pattern. As useful as decorators are, they add a layer of indirection that can make our code more difficult to understand.

## A Simple Example

Every function in python will have a `__name__` attribute that is its string name.

Let's write a decorator that prints a function's name at the time of decoration.

```python
def print_name(func):
    print(f"The function being decorated is named {func.__name__}.")

@print_name
def greet():
    return f"Hello, world."

greet()
```

```
The function being decorated is named greet.
Traceback (most recent call last):
  at block 5, line 5
TypeError: 'NoneType' object is not callable
```

Why did our `greet` function raise an Exception?

We decorated `greet` with our `print_name` decorator, but `print_name` doesn't return anything.

So we basically did the equivalent of writing `greet = None`.

Let's fix that.

```python
def print_name(func):
    print(f"The function being decorated is named {func.__name__}.")
    return func # < we return the original function

@print_name
def greet():
    return f"Hello, world."

for _ in range(3):
    print(greet())

# notice how we'll only print the description once, at the time we decorate `greet`. not on every invocation
```

```
The function being decorated is named greet.
Hello, world.
Hello, world.
Hello, world.
```

## Input and Output

What if we wanted to do something with the decorated function's input or output?

In that case, we would need to use what's called a **closure** to wrap the decorated function.

```python
import os

def print_name(func):
    print(f"The function being decorated is named {func.__name__}.", end=os.linesep * 2)
    def closure(*args, **kwargs):
        print(f"We're calling {func.__name__} with ({args = }, {kwargs = }).")
        result = func(*args, **kwargs)
        print(f"{func.__name__}({args[0]}) == {result}")
        return result
    return closure

@print_name
def greet(name):
    return f"Hello, {name}."

names = ["Jane", "Sam", "Batman"]

for name in names:
    greet(name)
    print("-" * 60)
```

```
The function being decorated is named greet.

We're calling greet with (args = ('Jane',), kwargs = {}).
greet(Jane) == Hello, Jane.
------------------------------------------------------------
We're calling greet with (args = ('Sam',), kwargs = {}).
greet(Sam) == Hello, Sam.
------------------------------------------------------------
We're calling greet with (args = ('Batman',), kwargs = {}).
greet(Batman) == Hello, Batman.
------------------------------------------------------------
```

## Decorators with arguments

What if we want to alter the behavior of our decorators?

To do that we'll need to have an additional level of functional "nesting".

In effect, what we'll be doing is writing a factory function that returns our actual decorator, but to the caller, it will just look like a decorator with arguments.

```python
import os

def print_name(excitedly=False):
    def decorator(func):
        msg = f"The function being decorated is named {func.__name__}."
        print(msg.upper() if excitedly else msg, end=os.linesep * 2)
        def closure(*args, **kwargs):
            msg = f"We're calling {func.__name__} with ({args = }, {kwargs = })."
            print(msg.upper() if excitedly else msg)
            return func(*args, **kwargs)
        return closure
    return decorator


@print_name() # notice the parenthesis here
def greet(name):
    return f"Hello, {name}."


@print_name(excitedly=True)
def plus_two(n):
    return n + 2


print(greet("Stephan"))
print("-" * 60)
print(plus_two(0))
```

```
The function being decorated is named greet.

THE FUNCTION BEING DECORATED IS NAMED PLUS_TWO.

We're calling greet with (args = ('Stephan',), kwargs = {}).
Hello, Stephan.
------------------------------------------------------------
WE'RE CALLING PLUS_TWO WITH (ARGS = (0,), KWARGS = {}).
2
```

## Bonus

### Retaining function metadata

Since we're writing functions that return functions, the original metadata we may have wanted or needed could be lost.

Let's see an example.

```python
def print_name(func):
    print(f"The function being decorated is named {func.__name__}.")
    def closure(*args, **kwargs):
        print(f"We're calling {func.__name__} with ({args = }, {kwargs = }).")
        return func(*args, **kwargs)
    return closure

@print_name
def greet(first_name, last_name=None):
    """Say hello."""
    last_name = last_name or ""
    name = f"{first_name} {last_name}".rstrip()
    return f"Hello, {name}."

print(f"{greet.__name__ = } {greet.__doc__ = }")
```

```
The function being decorated is named greet.
greet.__name__ = 'closure' greet.__doc__ = None
```

We can fix this by using another decorator from the standard library, `functools.wraps`.

```python
import functools

def print_name(func):
    print(f"The function being decorated is named {func.__name__}.")
    @functools.wraps(func) # notice our use of functools.wraps here
    def closure(*args, **kwargs):
        print(f"We're calling {func.__name__} with ({args = }, {kwargs = }).")
        return func(*args, **kwargs)
    return closure

@print_name
def greet(first_name, last_name=None):
    """Say hello."""
    last_name = last_name or ""
    name = f"{first_name} {last_name}".rstrip()
    return f"Hello, {name}."

print(f"{greet.__name__ = } {greet.__doc__ = }")
```

```
The function being decorated is named greet.
greet.__name__ = 'greet' greet.__doc__ = 'Say hello.'
```

### Avoiding outer parentheses

If we want to avoid _having_ to use outer parenthesis when writing decorators with arguments, we can do so by adding an initial argument to our factory and adjusting what's returned.

```python
import os

def print_name(f=None, excitedly=False): # notice the extra initial argument
    def decorator(func):
        msg = f"The function being decorated is named {func.__name__}."
        print(msg.upper() if excitedly else msg, end=os.linesep * 2)
        def closure(*args, **kwargs):
            msg = f"We're calling {func.__name__} with ({args = }, {kwargs = })."
            print(msg.upper() if excitedly else msg)
            return func(*args, **kwargs)
        return closure
    return decorator if f is None else decorator(f) # we alter our output based on the value of f


@print_name # notice the lack of parens here
def greet(first_name, last_name=None):
    last_name = last_name or ""
    name = f"{first_name} {last_name}".rstrip()
    return f"Hello, {name}."


@print_name(excitedly=True)
def plus_two(n):
    return n + 2


print(greet("Stephan"))
print("-" * 60)
print(plus_two(0))
```

```
The function being decorated is named greet.

THE FUNCTION BEING DECORATED IS NAMED PLUS_TWO.

We're calling greet with (args = ('Stephan',), kwargs = {}).
Hello, Stephan.
------------------------------------------------------------
WE'RE CALLING PLUS_TWO WITH (ARGS = (0,), KWARGS = {}).
2
```

[flask]: https://flask.palletsprojects.com/en/2.0.x/quickstart/
[fastapi]: https://fastapi.tiangolo.com/tutorial/first-steps/
[wrapt]: https://wrapt.readthedocs.io/en/latest/
