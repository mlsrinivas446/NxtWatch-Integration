const axios = require("axios")
const User = require("../models/userModel")

const Gaming =async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLiZN0Fd_jMqemqNeeFfV6Tc8OZ3sXAgkZ&key=AIzaSyB2kPZq_q_ju7SBl2dpp61zzxpjhjROkX0&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        const formatGamesData = response.data.items.map(each => ({
            name: each?.snippet?.channelTitle,
            profileImageUrl: each?.snippet?.thumbnails?.high?.url,
            id: each?.snippet?.resourceId.videoId,
            publishedAt: each?.snippet?.publishedAt,
            thumbnailUrl: each?.snippet?.thumbnails?.high?.url,
            title: each?.snippet?.title,
            isSaved: false,
        }))
        return res.status(200).json(formatGamesData)
    }
    catch (error) {
        console.log("Home Videos error:", error.message)
        return res.status(500).send("Gaming Videos error")
    }

}

module.exports = Gaming