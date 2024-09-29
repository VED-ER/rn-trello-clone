import { TouchableOpacity } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants";

interface DropdownImageTypeSelectProps {
    onCameraPress: () => void;
    onImagePress: () => void;
}

export default function DropdownImageTypeSelect({
    onCameraPress,
    onImagePress,
}: DropdownImageTypeSelectProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <TouchableOpacity>
                    <Ionicons name="image-outline" size={18} />
                </TouchableOpacity>
            </DropdownMenu.Trigger>
            {/*@ts-ignore*/}
            <DropdownMenu.Content>
                <DropdownMenu.Group>
                    <DropdownMenu.Item key="image" onSelect={onImagePress}>
                        <DropdownMenu.ItemTitle>Select an Image</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemImage
                            source={images.imageIcon32px}
                            width={20}
                            height={20}
                        />
                    </DropdownMenu.Item>

                    <DropdownMenu.Item key="camera" onSelect={onCameraPress}>
                        <DropdownMenu.ItemTitle>Open Camera</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemImage
                            source={images.photoCamera32px}
                            width={20}
                            height={20}
                        />
                    </DropdownMenu.Item>
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
