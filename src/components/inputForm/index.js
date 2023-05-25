import React from "react";

const InputForm = ({ setInputArr }) => {
	return (
		<form
			className='input-form'
			onSubmit={(e) => {
				e.preventDefault();
				let inputData = e.target.inputData.value;
				console.log(inputData, inputData?.split(","));
				let tempArr = inputData?.split(",");
				tempArr = tempArr.map((elm) => parseInt(elm));
				setInputArr(tempArr);
			}}
		>
			<input
				name='inputData'
				type='text'
				id='inputData'
				className='input-field'
				placeholder='Enter comma separated number to generate binary tree'
			/>
			<button type='submit' className='form-submit'>
				Submit
			</button>
		</form>
	);
};

export default InputForm;
