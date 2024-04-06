export class SafeStorage {
	constructor(public storage: Storage) {}

	getItem = <T>(key: string, checkType: (arg: unknown) => arg is T, fallback: T): T => {
		try {
			const savedValue = this.storage.getItem(key);

			if (savedValue) {
				const parsedSavedValue = JSON.parse(savedValue);

				if (checkType(parsedSavedValue)) {
					return parsedSavedValue;
				}
			}

			return fallback;
		} catch (_) {
			return fallback;
		}
	};

	setItem = <T>(key: string, item: T): void => {
		this.storage.setItem(key, JSON.stringify(item));
	};

	removeItem = (key: string): void => {
		this.storage.removeItem(key);
	};
}
