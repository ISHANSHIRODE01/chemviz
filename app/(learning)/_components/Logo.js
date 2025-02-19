import Image from "next/image";

const Logo = () => {
    return (
        <Image
            src="/ChemViz.svg"
            alt="ChemViz Logo"
            width={130}
            height={130}
        />
    );
};

export default Logo;