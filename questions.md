1. What is the difference between Component and PureComponent? give an
   example where it might break my app.

- Component does not implement `shouldComponentUpdate`, you have to manually implement it if you want.
- PureComponent has built-in `shouldComponentUpdate`.
- One way PureComponent may break the app is, it's `shouldComponentUpdate` shallowly compares the objects which may result false values for complex objects.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?

- If value in context changes but `shouldComponentUpdate` returns `false`, Child components will not receive updates.

3. Describe 3 ways to pass information from a component to its PARENT.

- Passing function to the Child, when its invoked Parent can access it.
- Using some global state management library or `Context`
- Maybe Compound Pattern? Nothing comes to my mind other than these

4. Give 2 ways to prevent components from re-rendering.

- Memoization a functional component with React.memo()
- Use `shouldComponentUpdate` for a class component

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

- Fragment is syntax that we use two group elements. We use it when we do not need extra dom element. I do not know exacly where it might break but my guess is it can cause some issues with css where we manipulate the children

6. Give 3 examples of the HOC pattern.

- HOC is a component that receives another component. We can reuse the same logic with multiple components by using HOC. `React.memo()` is well known HOC. One example can be showing loading text if component has loading prop.

```
   export default function withLoader(Element) {
      return (props) => {
         if (props.loading) {
            return <div>Loading...</div>;
         }

         return <Element {...props} />;
      };
   }
```

7. what's the difference in handling exceptions in promises, callbacks and
   async...await.

- For async/await we need to add `async` to the function to be able to use it.
- In callbacks you can access both error and data contrary to others where it either is success or fails

8. How many arguments does setState take and why is it async.

- It can take max 2 arguments. first one is object or callback function that returns new state. Second argument can be function which runs after setState is finished. Probably because of not blocking the UI while update is being done.

9. List the steps needed to migrate a Class to Function Component.

- Convert class syntax to function syntax
- Remove class component lifecycle methods and implement them using hooks
- Remove state & setState methods and implement them using hooks

10. List a few ways styles can be used with components.

- Global style added to the root component
- Directly injecting `style` to the component
- Using style objects and adding to the `style`
- Importing Styling File in Components and using `className`

11. How to render an HTML string coming from the server.

- `dangerouslySetInnerHTML` can be used
