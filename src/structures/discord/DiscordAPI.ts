import type { Channel, Guild, User } from '@api-typings/discord';

export class DiscordAPI {
	public static get channels(): Channel[] {}
	public static get guilds(): Guild[] {}
	public static get users(): User[] {}
}
