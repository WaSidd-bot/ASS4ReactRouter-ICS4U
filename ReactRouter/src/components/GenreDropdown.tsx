type GenreDropdownProps = {
    value: string;
    options: Array<{
        label: string;
        value: string;
    }>;
    onClick: (value: string) => void;
};

export const GenreDropdown = ({ value, options, onClick }: GenreDropdownProps) => {
    return (
        <form action="/submit" method="get">
            <label htmlFor="menu">Choose an option:</label>
            <select id="menu" name="menu">
                <option value="">----Select----</option>
                {options.map((option) => (
                    <option key={option.value} onClick={() => onClick(value)}>
                        {option.label}
                    </option>
                ))}

            </select>
            <input type="submit" value="Go" />
        </form>
    );
};