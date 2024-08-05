document.addEventListener('DOMContentLoaded', () => {
    const trainingForm = document.getElementById('training-form');
    const logList = document.getElementById('log-list');
    const videoForm = document.getElementById('video-form');
    const videoList = document.getElementById('video-list');
    let editIndex = null;
    let editVideoIndex = null;

    // 加载保存的训练日志和视频收藏
    loadLogs();
    loadVideos();

    // 监听训练日志表单提交事件
    trainingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            updateLog(editIndex);
        } else {
            addLog();
        }
    });

    // 监听视频收藏表单提交事件
    videoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (editVideoIndex !== null) {
            updateVideo(editVideoIndex);
        } else {
            addVideo();
        }
    });

    // 训练日志相关函数
    function addLog() {
        const date = document.getElementById('date').value;
        const duration = document.getElementById('duration').value;
        const notes = document.getElementById('notes').value;

        if (date && duration && notes) {
            const log = { date, duration, notes };
            saveLog(log);
            appendLog(log);
            trainingForm.reset();
        }
    }

    function saveLog(log) {
        let logs = JSON.parse(localStorage.getItem('tennisLogs')) || [];
        logs.push(log);
        localStorage.setItem('tennisLogs', JSON.stringify(logs));
    }

    function loadLogs() {
        let logs = JSON.parse(localStorage.getItem('tennisLogs')) || [];
        logs.forEach((log, index) => appendLog(log, index));
    }

    function appendLog(log, index) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>日期:</strong> ${log.date} <br>
                        <strong>时长:</strong> ${log.duration} 分钟 <br>
                        <strong>感受:</strong> ${log.notes}
                        <button class="edit" onclick="editLog(${index})">编辑</button>
                        <button class="delete" onclick="deleteLog(${index})">删除</button>`;
        logList.appendChild(li);
    }

    function updateLog(index) {
        let logs = JSON.parse(localStorage.getItem('tennisLogs'));
        logs[index] = {
            date: document.getElementById('date').value,
            duration: document.getElementById('duration').value,
            notes: document.getElementById('notes').value
        };
        localStorage.setItem('tennisLogs', JSON.stringify(logs));
        refreshLogs();
        trainingForm.reset();
        editIndex = null;
    }

    function editLog(index) {
        let logs = JSON.parse(localStorage.getItem('tennisLogs'));
        document.getElementById('date').value = logs[index].date;
        document.getElementById('duration').value = logs[index].duration;
        document.getElementById('notes').value = logs[index].notes;
        editIndex = index;
    }

    function deleteLog(index) {
        let logs = JSON.parse(localStorage.getItem('tennisLogs'));
        logs.splice(index, 1);
        localStorage.setItem('tennisLogs', JSON.stringify(logs));
        refreshLogs();
    }

    function refreshLogs() {
        logList.innerHTML = '';
        loadLogs();
    }

    // 视频收藏相关函数
    function addVideo() {
        const title = document.getElementById('video-title').value;
        const url = document.getElementById('video-url').value;

        if (title && url) {
            const video = { title, url };
            saveVideo(video);
            appendVideo(video);
            videoForm.reset();
        }
    }

    function saveVideo(video) {
        let videos = JSON.parse(localStorage.getItem('tennisVideos')) || [];
        videos.push(video);
        localStorage.setItem('tennisVideos', JSON.stringify(videos));
    }

    function loadVideos() {
        let videos = JSON.parse(localStorage.getItem('tennisVideos')) || [];
        videos.forEach((video, index) => appendVideo(video, index));
    }

    function appendVideo(video, index) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${video.url}" target="_blank">${video.title}</a>
                        <button class="edit" onclick="editVideo(${index})">编辑</button>
                        <button class="delete" onclick="deleteVideo(${index})">删除</button>`;
        videoList.appendChild(li);
    }

    function updateVideo(index) {
        let videos = JSON.parse(localStorage.getItem('tennisVideos'));
        videos[index] = {
            title: document.getElementById('video-title').value,
            url: document.getElementById('video-url').value
        };
        localStorage.setItem('tennisVideos', JSON.stringify(videos));
        refreshVideos();
        videoForm.reset();
        editVideoIndex = null;
    }

    function editVideo(index) {
        let videos = JSON.parse(localStorage.getItem('tennisVideos'));
        document.getElementById('video-title').value = videos[index].title;
        document.getElementById('video-url').value = videos[index].url;
        editVideoIndex = index;
    }

    function deleteVideo(index) {
        let videos = JSON.parse(localStorage.getItem('tennisVideos'));
        videos.splice(index, 1);
        localStorage.setItem('tennisVideos', JSON.stringify(videos));
        refreshVideos();
    }

    function refreshVideos() {
        videoList.innerHTML = '';
        loadVideos();
    }

    // 将函数挂载到window对象，以便在HTML中调用
    window.editLog = editLog;
    window.deleteLog = deleteLog;
    window.editVideo = editVideo;
    window.deleteVideo = deleteVideo;
});