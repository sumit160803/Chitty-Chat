export const formatMessageTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
}