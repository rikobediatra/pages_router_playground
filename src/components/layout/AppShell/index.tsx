import { useRouter } from "next/router";
// lazy load dynamic
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../Navbar"));

type AppShellProps = {
    children: React.ReactNode,
}

function AppShell(props: AppShellProps) {
    const { children } = props;
    const { pathname } = useRouter();

    const disableNavbar = ["/auth/login", "/auth/register", "/404"];
  return (
    <main>
        {!disableNavbar.includes(pathname) && <Navbar />}
        { children }
    </main>
  )
}

export default AppShell