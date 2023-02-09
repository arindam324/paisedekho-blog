import bcrypt from "bcrypt";

export type User = {
    email: string;
    password: string;
    isAdmin: boolean;
};

export const verifyCredentials = async (email: string, password: string) => {
    const User: User[] = [
        {
            email: "admin@gmail.com",
            password: "admin@1234",
            isAdmin: true,
        },
    ];

    try {
        const user = User.find((e) => e.email === email);
        if (!user) {
            return null;
        }

        //TODO: check with password hash if the password correct or not
        // const isPasswordMatch = await bcrypt.compare(password, user.password);
        // if (!isPasswordMatch) {
        //   return null;
        // }

        return user;
    } catch (err) {
        console.log(err);
    }
};
