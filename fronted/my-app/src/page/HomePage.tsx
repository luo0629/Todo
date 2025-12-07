import React, { useEffect } from "react"
import EventPage from "../component/homePage/eventPage";
import PageHead from "../component/pageHead";
import TagList from "../component/tagList";
import { useTodoStore } from "../store/todoStore";

const HomePage: React.FC = () => {
    const { events, selectedTag, setSelectedTag, fetchEvents } = useTodoStore();


    useEffect(() => {
        fetchEvents(selectedTag);

    }, []);

    return (
        <div>
            <PageHead title="我的任务" />
            <TagList selectedTag={selectedTag} handleTagClick={setSelectedTag} />
            {events && (events.old_events?.length + events.other_events?.length + events.today_events?.length + events.tomorrow_events?.length) > 0 && <EventPage Events={events} />}
        </div>
    )
}
export default HomePage;
