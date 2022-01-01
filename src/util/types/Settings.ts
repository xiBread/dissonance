type RGB = [red: number, green: number, blue: number];

type ColorLike = `#${string}` | number | RGB;

export type SettingValue = string | number | boolean;

export enum SettingOptionType {
	Group,
	String,
	Number,
	Input,
	Color,
	File,
	Slider,
	Switch,
	Radio,
}

export type SettingOption = {
	name: string;
	description?: string;
	disabled?: boolean;
} & (
	| {
			type: SettingOptionType.Group;
			expanded?: boolean;
			collapsible?: boolean;
			options: SettingOption[];
	  }
	| {
			type: SettingOptionType.String;
			default?: string;
			clearable?: boolean;
			choices: SettingOptionChoice<string>[];
	  }
	| {
			type: SettingOptionType.Number;
			default?: number;
			clearable?: boolean;
			choices: SettingOptionChoice<number>[];
	  }
	| {
			type: SettingOptionType.Input;
			placeholder?: string;
			clearable?: boolean;
			validator?: (input: string) => boolean;
	  }
	| {
			type: SettingOptionType.Color;
			default?: ColorLike;
			presets?: ColorLike[];
	  }
	| {
			type: SettingOptionType.File;
			fileTypes?: string[];
			multiple?: boolean;
			validator?: (filename: string) => boolean;
	  }
	| {
			type: SettingOptionType.Slider;
			default?: number;
			color?: ColorLike;
			minValue?: number;
			maxValue?: number;
			marks?: Record<number, string>;
			stepSize?: number;
			displayStops?: boolean;
	  }
	| {
			type: SettingOptionType.Switch;
			default?: "off" | "on";
			onValue?: SettingValue;
			offValue?: SettingValue;
	  }
	| {
			type: SettingOptionType.Radio;
			default?: SettingValue;
			choices: SettingOptionRadio[];
	  }
);

export interface SettingOptionChoice<T> {
	name: string;
	value: T;
	description?: string;
}

export interface SettingOptionRadio {
	name: string;
	value: SettingValue;
	description?: string;
	color?: ColorLike;
}
