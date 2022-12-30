import { useEffect, useState } from 'react';
import './Video.css';

const VIDEO_LENGTH = 110; // the video length in seconds

export default function Video() {
    const [running, setRunning] = useState(true);
    const [time, setTime] = useState(0);
    const [showComments, setShowComments] = useState(true);

    useEffect(() => {
        if (running) {
            const handle = setTimeout(() => {
                if (time < VIDEO_LENGTH) {
                    setTime(time + 1);
                }
            }, 1000);
            return () => {
                clearTimeout(handle);
            };
        }
    }, [running, time]);

    useEffect(() => {
        const unsubscribe = window.inScreen.listenToTimelineActivations(({ locator, value }) => {
            if ('my-video' !== locator) {
                return false; // This prevents confusions between two video players.
            }
            // Perform seek
            setTime(value);
            // Pause video
            setRunning(false);
            return true; // <- mandatory
        });
        return unsubscribe;
    }, []);

    return (
        <div className="player">
            <div className="video">
                <div className="video-content">Hey {time}</div>
                <div className="comments-track">
                    {showComments && (
                        <inscreen-inline-timeline-threads-display
                            locator="my-video"
                            start-value="0"
                            end-value={`${VIDEO_LENGTH}`}
                        />
                    )}
                </div>
                <inscreen-anchor
                    version="A"
                    context-title="My Video"
                    title={`🕔 ${new Date(time * 1000).toISOString().slice(14, 19)}`}
                    locator={`my-video::${time}`}
                    screenshot-url="https://loremflickr.com/250/150"
                    behavior="inline-timeline-threads-display"
                />
            </div>
            <button
                className="play-pause"
                onClick={() => {
                    setRunning(!running);
                }}
            >
                {running ? 'Pause' : 'Play'}
            </button>
            <button
                onClick={() => {
                    setShowComments(true);
                    window.inScreen.startThread(`my-video::${time}`, 'inline-timeline-threads-display');
                }}
            >
                Add comment
            </button>
            <label>
                <input
                    type="checkbox"
                    checked={showComments}
                    onChange={() => {
                        setShowComments(!showComments);
                    }}
                />
                Show comments?
            </label>
        </div>
    );
}
