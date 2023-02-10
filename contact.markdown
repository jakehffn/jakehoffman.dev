---
title: Contact
---

I live in a small hut in the mountains of Kumano Kodō on Kii Hantō and would not

like to be contacted.

```haskell
qsort []     = []
qsort (x:xs) = qsort (filter (< x) xs) ++ [x] ++
               qsort (filter (>= x) xs)
```

```c++

#include <iostream>

// Main Function
int main() {
    int n;
    long double factorial = 1.0;

    std::cout << "Enter a positive integer: ";
    std::cin >> n;

    if (n < 0)
        std::cout << "Error! Factorial of a negative number doesn't exist.";
    else {
        for(int i = 1; i <= n; ++i) {
            factorial *= i;
        }
        std::cout << "Factorial of " << n << " = " << factorial;    
    }

    return 0;
}

```

```CSS
footer {
  width: 60rem;
  margin-top: 3rem;
  padding: 1.2rem 0;
  font-size: 1.2rem;
  color: var(--subtle-text-color);
  
  float: right;
}
```