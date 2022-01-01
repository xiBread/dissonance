import { EventEmitter } from 'events';

export class DissonanceModule extends EventEmitter {
	public constructor(protected readonly id: string) {
		super();
	}
}
