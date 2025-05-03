"use client";

import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";

type props = {
	values: string[];
	// setTags: Dispatch<SetStateAction<string[]>>;
	setValues: (tags: string[]) => void;
	placeholder?: string;
};

export default function ArrayInput({ values, setValues, placeholder }: props) {
	const [inputValue, setInputValue] = useState("");

	const addTag = (v: string) => {
		const value = v.trim();
		if (value && !values.includes(value)) {
			setValues([...values, value]);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTag(inputValue);
			setInputValue("");
		} else if (e.key === "Backspace" && inputValue === "") {
			setValues(values.slice(0, -1));
		}
	};

	const removeValue = (valueToRemove: string) => {
		setValues(values.filter(value => value !== valueToRemove));
	};

	return (
		<div className=''>
			<div className='flex flex-wrap gap-2 mb-2'>
				{values.map(value => (
					<span
						key={value}
						className='flex items-center gap-2 bg-white p-1 px-2'
					>
						<span>{value}</span>
						<button
							onClick={() => removeValue(value)}
							className=' text-lg text-red-500 hover:text-red-700'
						>
							×
						</button>
					</span>
				))}
			</div>
			<Input
				type='text'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={`${placeholder} (press enter to add)`}
				className='w-full h-10 shadow-none border-gray-500 bg-white rounded-none'
			/>
		</div>
	);
}
