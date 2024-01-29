import ReduxToastr from "react-redux-toastr"

interface IReduxToast {}

export function ReduxToast({}: IReduxToast) {
	return (
		<>
			<ReduxToastr
				newestOnTop={false}
				preventDuplicates
				progressBar
				closeOnToastrClick
				timeOut={2000}
				transitionIn="fadeIn"
				transitionOut="fadeOut"
			/>
		</>
	)
}
