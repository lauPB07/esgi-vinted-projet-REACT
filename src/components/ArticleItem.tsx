

type ArticleItemProps = {
    id: string;
    title: string,
    price: number,
    size: string;
    imageUrl: string;
    userName: string;
    onClickTitle: (idArticle: string) => void;
}

const getAvatarColor = (name: string) => {
    const colors = [
        'bg-red-400', 'bg-blue-400', 'bg-green-400',
        'bg-yellow-400', 'bg-purple-400', 'bg-pink-400',
        'bg-indigo-400', 'bg-teal-400'
    ];
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
};

export function ArticleItem({id, title, price, size, imageUrl, userName, onClickTitle}: ArticleItemProps) {

    const avatarColor = getAvatarColor(userName);
    return (
      <div
        onClick={() => onClickTitle(id)}
        className="flex flex-col gap-2 cursor-pointer group max-w-[200px]"
      >
          <div className="flex items-center gap-2 px-1">
              <div
                className={`w-7 h-7 rounded-full ${avatarColor} flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}>
                  {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-gray-500 truncate">{userName}</span>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={imageUrl}
                alt={title}
              />
          </div>
          <div className="flex flex-col px-1">
              <span className="text-base font-bold text-gray-900">{price} €</span>
              <span className="text-xs text-gray-400 uppercase tracking-tighter">{size}</span>
              <span className="text-xs text-gray-400 truncate">{title}</span>
          </div>
      </div>
    )
}