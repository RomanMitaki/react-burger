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

export type TUser = {
    name: string,
    email: string,
    password: string,
};

export type TLoginData = {
    email: string,
    password: string,
};

export type TResetPasswordData = {
    token: string,
    password: string,
};

export type TRegisterData = {
    name: string,
    email: string,
    password: string,
};

export type TIngredientListResponse = {
    data: ReadonlyArray<TIngredient>,
    success: boolean,
}
