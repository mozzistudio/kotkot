import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      companyName: string;
      brandName: string;
      primaryColor: string;
      plan: string;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    companyName: string;
    brandName: string;
    primaryColor: string;
    plan: string;
  }
}
