import { TouchableOpacity } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";

export default function DropdownImageTypeSelect() {
    // TODO: Finish image select or camera
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
                    <DropdownMenu.Item key="board" onSelect={() => {}}>
                        <DropdownMenu.ItemTitle>Select an Image</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIcon
                            ios={{
                                name: "square.split.2x1",
                                pointSize: 24,
                            }}
                        ></DropdownMenu.ItemIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item key="card">
                        <DropdownMenu.ItemTitle>Open Camera</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIcon
                            ios={{
                                name: "square.topthird.inset.filled",
                                pointSize: 24,
                            }}
                        ></DropdownMenu.ItemIcon>
                    </DropdownMenu.Item>
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
