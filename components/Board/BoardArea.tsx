import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Board, TaskList, TaskListFake } from "@/types/enums";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useSupabase } from "@/context/SupabaseContext";
import { useEffect, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ListView from "@/components/Board/ListView";
import ListStart from "@/components/Board/ListStart";
import { colors } from "@/constants/tailwind-colors";
import { useHeaderHeight } from "@react-navigation/elements";

export interface BoardAreaProps {
    board?: Board;
}

export default function BoardArea({ board }: BoardAreaProps) {
    const { width, height } = useWindowDimensions();
    const { getBoardLists, addBoardList } = useSupabase();
    const [startListActive, setStartListActive] = useState(false);
    const scrollOffsetValue = useSharedValue<number>(0);
    const [data, setData] = useState<(TaskList | TaskListFake)[]>([{ id: undefined }]);
    const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        loadBoardLists();
    }, []);

    const loadBoardLists = async () => {
        if (!board) return;
        const lists = await getBoardLists!(board.id);
        // Add our fake item to the end of the list
        setData([...lists, { id: undefined }]);
    };

    const onSaveNewList = async (title: any) => {
        setStartListActive(false);
        const { data: newItem } = await addBoardList!(board!.id, title);
        data.pop();
        setData([...data, newItem, { id: undefined }]);
    };

    const onListDeleted = (id: string) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Carousel
                vertical={false}
                width={width}
                height={height - headerHeight}
                loop={false}
                ref={ref}
                onProgressChange={progress}
                defaultScrollOffsetValue={scrollOffsetValue}
                data={data}
                pagingEnabled={true}
                renderItem={({ index, item }: any) => (
                    <>
                        {item.id && (
                            <ListView
                                key={index}
                                taskList={item}
                                onDelete={() => onListDeleted(item.id)}
                            />
                        )}
                        {item.id === undefined && (
                            <View key={index} style={{ paddingTop: 20, paddingHorizontal: 30 }}>
                                {!startListActive && (
                                    <TouchableOpacity
                                        onPress={() => setStartListActive(true)}
                                        className={
                                            "bg-[#00000047] h-11 rounded-md items-center justify-center"
                                        }
                                    >
                                        <Text style={{ color: colors.fontLight, fontSize: 18 }}>
                                            Add list
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                {startListActive && (
                                    <ListStart
                                        onCancel={() => setStartListActive(false)}
                                        onSave={onSaveNewList}
                                    />
                                )}
                            </View>
                        )}
                    </>
                )}
            />
            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "#ffffff5c", borderRadius: 40 }}
                size={8}
                activeDotStyle={{ backgroundColor: "#fff" }}
                containerStyle={{
                    gap: 10,
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    right: 0,
                    justifyContent: "center",
                    marginBottom: 70,
                }}
            />
        </SafeAreaView>
    );
}
