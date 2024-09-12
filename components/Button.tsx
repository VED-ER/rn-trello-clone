import { Platform, Text, TouchableOpacity, View } from "react-native";
import { ButtonProps } from "@/types/enums";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return "bg-gray-500";
        case "danger":
            return "bg-red-500";
        case "success":
            return "bg-green-500";
        case "outline":
            return "bg-transparent border-white border-[0.5px]";
        default:
            return "bg-white";
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return "text-black";
        case "secondary":
            return "text-white";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-green-100";
        default:
            return "text-primary";
    }
};

export default function Button({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    ...rest
}: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} {...rest}>
            <View
                className={`w-full rounded-lg p-3 flex flex-row justify-center items-center ${getBgVariantStyle(bgVariant)} ${className}`}>
                {IconLeft && <IconLeft />}
                <Text className={`text-lg ${getTextVariantStyle(textVariant)}`}>{title}</Text>
                {IconRight && <IconRight />}
            </View>
        </TouchableOpacity>
    );
}
