const pageHasScroll = () => {
  const html = document.getElementsByTagName('html')[0];
  return html.scrollHeight > html.clientHeight;
};

const pageScrolledToBottom = (offset, gap = 0) => {
  const html = document.getElementsByTagName('html')[0];

  return offset >= html.scrollHeight - html.clientHeight - gap;
};

export { pageHasScroll, pageScrolledToBottom };
