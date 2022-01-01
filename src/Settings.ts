import { EventEmitter } from 'events';
import { appendFile, readFile } from 'fs/promises';
import type { SettingOption, SettingValue } from './util';

export interface Settings<T extends SettingOption> {
	on(event: 'update', listener: (/* ...args: any[] */) => void): this;
}

export class Settings<T extends SettingOption> extends EventEmitter {
	public constructor(public readonly options: T) {
		super();
	}

	public get(key: T['name']): unknown {}
	public set(key: string, value: SettingValue): this {
		return this;
	}

	public async save(name?: string): Promise<void> {}
	public async load(name?: string): Promise<unknown> {}
}
