export default function AuthSessionStatus({ status, className, ...props }) {
    return (
        <>
            {status && (
                <div
                    className={`${className} text-center my-2 bg-customColor text-white font-bold p-3 uppercase`}
                    {...props}
                >
                    {status}
                </div>
            )}
        </>
    );
}
