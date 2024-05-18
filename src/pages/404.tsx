import Image from "next/image";

const Custom404 = () => {
    return (
        <div className="error">
            {/* <Image src="/not_found.png" alt="not found" width={800} height={800}/> */}
            <h1>404 | Halaman Tidak Ditemukan</h1>
        </div>
    );
}

export default Custom404;