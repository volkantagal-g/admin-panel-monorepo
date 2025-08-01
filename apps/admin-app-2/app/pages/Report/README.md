## How to Create a New Input Type

To begin, you must define a `PARAMETER_TYPE` within the `app/pages/Report/constants.js` file.

Once you have completed the definition of `PARAMETER_TYPE`, navigate to the `app/pages/Report/Reports/constants.js` file. In this file, define the input type within the `getAllSpecialConfigs` function. This definition includes options for the component that will be rendered in the creation of a `Report`. Input types can be generic, such as `select`, `string`, `number`, or custom-defined types like `s3upload`, etc.

After completing the above steps, it's time to define the actual input type. To do this, navigate to the `app/components/DynamicForm/constants.js` file and locate the `AVAILABLE_INPUT_TYPE` constant. Inside this constant, create a new key if you're introducing a completely new input type. Provide a `name` and define the component as a function for what you want to render.

To pass props to the recently created component, define a new `case` in the `app/components/DynamicForm/DynamicFormItem/index.js` file.
