import { OpaqueToken } from '@angular/core';

// opaque token to have DI of non-class, interface cannot be injected
export interface AppConfig {
    title: string
}

export const HERO_DI_CONFIG: AppConfig = {
    title: 'ha'
}

export let APP_CONFIG = new OpaqueToken('app.config');
