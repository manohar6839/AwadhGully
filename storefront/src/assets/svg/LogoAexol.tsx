import Image from 'next/image';

interface SvgProps {
    width?: number;
    height?: number;
}

export const LogoAexol: React.FC<SvgProps> = ({ height, width }) => (
    <Image
        src="/logo.png"
        alt="Aexol"
        width={width || 104}
        height={height || 89}
        style={{
            objectFit: 'contain',
            width: width ? `${width}px` : 'auto',
            height: height ? `${height}px` : 'auto',
        }}
    />
);
