const axios = require("axios")
//const User = require("../models/userModel")

const VideoDetails =async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YOUTUBE_API_KEY}&part=statistics,snippet,contentDetails,status`)
        const formatVideoDetails = {
            name: response.data.items[0].snippet.channelTitle,
            profileImageUrl: `https://www.youtube.com/watch?v=${response.data.items[0].id}`,
            description: response.data.items[0].snippet.description,
            id: response.data.items[0].id,
            publishedAt: response.data.items[0].snippet.publishedAt,
            thumbnailUrl: response.data.items[0].snippet.thumbnails.high.url,
            title: response.data.items[0].snippet.title,
            videoUrl: `https://www.youtube.com/watch?v=${response.data.items[0].id}`,
            viewCount: response.data.items[0].statistics.viewCount,
            tags: response.data.items[0].snippet.tags || [],
            channelTitle: response.data.items[0].snippet.channelTitle,
        }
        return res.status(200).json(formatVideoDetails)
    }
    catch (error) {
        console.log("Home Videos error:", error.message)
        return res.status(500).send("Videos Details error")
    }

}

module.exports = VideoDetails