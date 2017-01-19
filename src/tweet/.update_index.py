import sys

list_of_tweet = sys.argv[1:]


ls = []


def extract_tweet(path):
	s = open(path, "r").read()
	ls = s.split()
	date = ls[0]
	return date, s
for tweet_path in list_of_tweet:
	if not tweet_path.endswith("index.md"):
		date, content = extract_tweet(tweet_path)
		ls.append((date, content))

ls.sort(key=lambda p:p[0], reverse=True)


f = open("index.md", "a")
for content in map(lambda p:p[1], ls):
	f.write("\n")
	f.write("<article>")
	f.write("\n")
	f.write(content)
	f.write("\n")
	f.write("</article>")
	f.write("\n")
f.close()





