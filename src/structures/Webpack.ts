import Module from "module";

declare global {
	interface Window {
		webpackJsonp: {
			push: (module: any[]) => {
				m: Record<number | string, unknown>;
				c: Record<number | string, WebpackModule>;
				cache?: Record<number, WebpackModule>;
			};
		};
	}
}

interface WebpackModule {
	i: number;
	l: boolean;
	exports: Exports;
}

interface ModuleLike extends Module {
	exports: Exports;
}

interface Exports {
	[id: string]: any;
	__esModule: boolean;
	default: Function & {
		[key: string]: any;
		displayName?: string;
	};
}

export class WebpackModules {
	#cached = false;
	#requireCache?: Record<number, WebpackModule>;

	public constructor(private readonly id: string) {}

	public filter(predicate: (exports: Exports) => boolean): Exports[] {
		const found: Exports[] = [];

		for (const i in this.#modules) {
			if (!this.#modules.hasOwnProperty(i)) continue;
			const { exports } = this.#modules[i];

			if (predicate(exports)) {
				found.push(exports);
			}
		}

		return found;
	}

	get #modules(): Record<number, WebpackModule> {
		if (this.#cached) {
			return this.#requireCache!;
		}

		const webpackRequire = window.webpackJsonp.push([
			[],
			{
				[this.id]: (module: ModuleLike, _: unknown, require: any) => (module.exports = require),
			},
			[[this.id]],
		]);

		delete webpackRequire.m[this.id];
		delete webpackRequire.c[this.id];
		webpackRequire.cache = webpackRequire.c;

		this.#cached = true;
		this.#requireCache = webpackRequire.cache;

		return this.#requireCache;
	}
}
