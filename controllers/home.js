const axios = require("axios")
//const User = require("../models/userModel")

const Home =async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${process.env.HOME_VIDEOS_ID}&key=${process.env.YOUTUBE_API_KEY}`)
        const formatVideosList = response.data.items.map(each => ({
            name: each?.snippet?.channelTitle,
            profileImageUrl: each?.snippet?.thumbnails?.high?.url,
            id: each?.id,
            publishedAt: each?.snippet?.publishedAt,
            thumbnailUrl: each?.snippet?.thumbnails?.high?.url,
            viewCount: each?.statistics?.viewCount,
            title: each?.snippet?.title,
            isSaved: false,
        }))
        return res.status(200).json(formatVideosList)
    }
    catch (error) {
        console.log("Home Videos error:", error.message)
        return res.status(500).send("Home Videos error")
    }

}

module.exports = Home