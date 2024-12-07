export const handleClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  return handleClick;
};

export const getInitials = (nickname: string) => {
  const parts = nickname.split(' ');
  const initials = (parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : nickname[0].toUpperCase());
  
  return initials
};

export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || 'An error occurred'}`);
  }
};