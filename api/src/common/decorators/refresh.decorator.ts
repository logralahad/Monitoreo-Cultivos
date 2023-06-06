import { SetMetadata } from '@nestjs/common';

export const IS_REFRESH_KEY = 'isRefreshToken';
export const RefreshToken = () => SetMetadata(IS_REFRESH_KEY, true);
