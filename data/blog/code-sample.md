---
title: Sample .md file
date: '2016-03-08'
tags: ['markdown', 'code', 'features']
draft: false
summary: Example of a markdown file with code blocks and syntax highlighting
---

A sample post with markdown.

## Inline Highlighting

Sample of inline highlighting `sum = parseInt(num1) + parseInt(num2)`

## Code Blocks

Some Javascript code

```javascript
  var num1, num2, sum
  num1 = prompt("Enter first number")
  num2 = prompt("Enter second number")
  sum = parseInt(num1) + parseInt(num2) // "+" means "add"
  alert("Sum = " + sum)  // "+" means combine into a string
```

Some Python code 🐍

```python
def fib():
    a, b = 0, 1
    while True:            # First iteration:
        yield a            # yield 0 to start with and then
        a, b = b, a + b    # a will now be 1, and b will also be 1, (0 + 1)

for index, fibonacci_number in zip(range(10), fib()):
     print('{i:3}: {f:3}'.format(i=index, f=fibonacci_number))
```
