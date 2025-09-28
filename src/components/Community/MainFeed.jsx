
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Heart, MessageCircle, Share2, MoreHorizontal, Users } from "lucide-react";

const MainFeed = ({ filteredPosts, likedPosts, handleLike }) => (
  <main className="flex-1 space-y-6 mx-6">
    {/* Share Your Thoughts Section */}
    <Card className="border border-blue-200 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-900">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share Your Thoughts..."
                className="w-full p-4 border border-blue-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="flex space-x-3">
              <Button  size="sm" className=" text-white hover:bg-blue-50">
                Poll
              </Button>
              <Button size="sm" className=" text-white hover:bg-blue-50">
                Article  
              </Button>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800 text-white">
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Posts Feed */}
    {filteredPosts.map((post) => (
      <Card key={post.id} className="border border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Post Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={post.authorImage} 
                  alt={post.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-blue-900">{post.author}</h4>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Post Content */}
            <p className="text-gray-800">{post.content}</p>

            {/* Poll Options */}
            {post.type === 'poll' && post.pollOptions && (
              <div className="space-y-2">
                {post.pollOptions.map((option, index) => (
                  <div key={index} className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                    <p className="text-blue-900">{option}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Post Image */}
            {post.image && (
              <img 
                src={post.image} 
                alt="Post content"
                className="w-full rounded-lg max-h-80 object-cover"
              />
            )}

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2">
              {post.hashtags && post.hashtags.map((hashtag) => (
                <Badge key={hashtag} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer">
                  {hashtag}
                </Badge>
              ))}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-blue-100">
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </main>
);

export default MainFeed;