// components
import { RoomList } from '@/app/components/room/RootList';
import { ChatRoom } from '@/app/components/room/ChatRoom';

/**
 * ホーム
 * @returns JSX.Element
 */
export default function Home() {
    return (
        <main className="flex-1 flex">
            <RoomList />
            <div className="flex-1">
                <ChatRoom />
            </div>
        </main>
    );
}
