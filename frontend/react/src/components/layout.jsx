import * as React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout(props) {
    const { children } = props;
    return (
        <>
            <Header {...props} />
            <div className="m-0">
                <main className="min-h-[100vh] pt-[15%] sm:pt-[6%]">
                    {children}
                </main>
                <Footer {...props} />
            </div>
        </>
    );
}
