import {Location} from 'history';

export type TIngredient = {
    readonly _id: string,
    readonly name: string,
    readonly type: string,
    readonly proteins: number,
    readonly fat: number,
    readonly carbohydrates: number,
    readonly calories: number,
    readonly price: number,
    readonly image: string,
    readonly image_mobile: string,
    readonly image_large: string,
    readonly __v: number,
    uniqueId?: string,
    quantity?: number,
    index?: number
};

export type TOrder = {
    readonly createdAt: string,
    readonly ingredients: string[],
    readonly name: string,
    readonly number: null | number,
    readonly price: number,
    readonly status: string,
    readonly updatedAt: string,
    readonly _id: string,
}

export type TLoginData = {
    email: string,
    password: string,
};

export type TRegisterData = {
    name: string,
    email: string,
    password: string,
};

export type TIngredientListResponse = {
    data: TIngredient[],
    success: boolean,
}

export type TOrderResponse = {
    order: TOrder,
    success: boolean,
}

export type TLoginSuccessResponse = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string,
    }
}

export type TLogoutResponse = {
    success: boolean,
    message: string,
}

export type TGetUserResponse = {
    success: boolean,
    user: {
        email: string,
        name: string,
    }
}

export type TRefreshTokenResponse = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
}

export type TForgotPasswordResponse = {
    success: boolean,
    message: string
}

export type TResetPasswordResponse = TForgotPasswordResponse;

export type TWsMessageResponse = {
    success?: boolean,
    orders: [
        {
            ingredients: string[],
            _id: string,
            status: string,
            number: number,
            createdAt: string,
            updatedAt: string,
            name: string
        }
    ],
    total: number,
    totalToday: number,
}

export type TLocation = {
    background?: Location<TLocation>;
    from?: { pathname: string };
};
