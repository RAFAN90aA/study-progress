import React, { useState, useEffect } from 'react';

const subjects = [
    { name: 'Additional Mathematics', chapters: [] },
    { name: 'Physics', chapters: [] },
    { name: 'Biology', chapters: [] },
    { name: 'Chemistry', chapters: [] },
    { name: 'Mathematics', chapters: [] },
    { name: 'English Language', chapters: [] },
    { name: 'ICT', chapters: [] },
];

const App = () => {
    const [data, setData] = useState(subjects);

    useEffect(() => {
        const storedData = localStorage.getItem('study-progress');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('study-progress', JSON.stringify(data));
    }, [data]);

    const toggleChapter = (subjectIndex, chapter) => {
        const newData = [...data];
        const chapterIndex = newData[subjectIndex].chapters.indexOf(chapter);
        if (chapterIndex >= 0) {
            newData[subjectIndex].chapters.splice(chapterIndex, 1);
        } else {
            newData[subjectIndex].chapters.push(chapter);
        }
        setData(newData);
    };

    const exportData = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'study_progress_backup.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Study Progress Tracker</h1>
            <button onClick={exportData} className="mb-4 p-2 bg-blue-500 text-white rounded">Export/Backup</button>
            <div>
                {data.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="mb-4 p-4 border rounded bg-gray-100">
                        <h2 className="text-xl font-semibold">{subject.name}</h2>
                        <div>
                            <h3 className="font-medium">Chapters</h3>
                            {['Chapter 1', 'Chapter 2', 'Chapter 3'].map((chapter) => (
                                <label key={chapter} className="block">
                                    <input
                                        type="checkbox"
                                        checked={subject.chapters.includes(chapter)}
                                        onChange={() => toggleChapter(subjectIndex, chapter)}
                                    /> {chapter}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;