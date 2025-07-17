/**
* @typedef Step
* @prop {number} key
* @prop {number} next
* @prop {number} prev
* @prop {number} state
* @prop {object} data
*/

/**
* @typedef Plan
* @prop {string} _id
* @prop {Step[]} steps
* @prop {number} currentStep
* @prop {{
*           warehouseDomainType: number[];
*           country: string;
*       }} properties
*/

/**
 * @typedef Formik
 * @prop {import('formik').FormikConfig} formikConfig
 * @prop {ReturnType<import('formik').useFormik>} formikReturn
 */

/**
 * @typedef RenderProps
 * @prop {Formik['formikReturn']} formik
 * @prop {() => void} resetFileList
 */

/**
* @typedef CommonForm
* @prop {Plan} plan
* @prop {Step} step
* @prop {boolean} isPending
* @prop {(formik: Formik['formikReturn']) => boolean} toggleFileUploadVisibility
* @prop {React.ReactNode} children
* @prop {Function} stepChange
* @prop {Formik['formikConfig']} formikConfig
* @prop {(rp: RenderProps) => JSX.Element} renderAboveUpload
* @prop {(rp: RenderProps) => JSX.Element} renderBelowUpload
*/

/**
* @typedef StepComponent
* @prop {Step} step
* @prop {Plan} plan
* @prop {boolean} isPending
* @prop {Function} stepChange
*/

export default {};
