import React, { useState } from 'react'
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer"
import { ChatState } from '../Context/ChatProvider';
import ChatBox from "../components/ChatBox"
import MyChats from "../components/MyChats"

const ChatPage = () =>
{

    const { user } = ChatState();
    const [ fetchAgain, setFetchAgain ]  = useState( false );

    return (
        <div style={ { width: "100%" } }>
            { user && <SideDrawer /> }
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                { user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> }
                { user && <ChatBox fetchAgain={ fetchAgain } setFetchAgain={ setFetchAgain } /> }
            </Box>
        </div>
    )
}

export default ChatPage