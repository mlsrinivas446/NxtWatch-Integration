const axios = require("axios")
//const User = require("../models/userModel")

const Trending =async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${process.env.TRENDING_VIDEOS_ID}&key=${process.env.YOUTUBE_API_KEY}`)
        const formatTrendingData = response.data.items.map(each => ({
            name: each?.snippet?.channelTitle,
            profileImageUrl: each?.snippet?.thumbnails?.high?.url,
            id: each?.id,
            publishedAt: each?.snippet?.publishedAt,
            thumbnailUrl: each?.snippet?.thumbnails?.high?.url,
            viewCount: each?.statistics?.viewCount,
            title: each?.snippet?.title,
            isSaved: false,
        }))
        return res.status(200).json(formatTrendingData)
    }
    catch (error) {
        console.log("Home Videos error:", error.message)
        return res.status(500).send("Trending Videos error")
    }

}

module.exports = Trending