import { DissonanceModule } from './DissonanceModule';

export abstract class Plugin extends DissonanceModule {
	public constructor(readonly id: string) {
		super(id);
	}

	public abstract load(): Promise<void> | void;
	public abstract unload(): Promise<void> | void;
}
