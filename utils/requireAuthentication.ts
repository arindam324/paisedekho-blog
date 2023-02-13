import { GetServerSidePropsContext } from "next";

type Context = GetServerSidePropsContext & {
  res: GetServerSidePropsContext["res"] & {
    redirect: (statusCode: number, destination: string) => void;
  };
};

export function requireAuthentication<T>(gssp: (ctx: Context) => Promise<T>) {
  return async (context: Context) => {
    const { req, res } = context;
    const token = req.cookies.isAdmin;

    if (!token) {
      // Redirect to login page
      res.writeHead(301, {
        Location: "/login",
      });
      res.end();
      return;
    }

    return await gssp(context);
  };
}
