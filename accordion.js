import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./accordion.module.scss";

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
    const itemClassNames = classNames(
        styles["accordion-item"],
        isOpen && styles.open
    );

    return (
        <div className={itemClassNames}>
            <div
                className={classNames(styles["accordion-question"], isOpen && styles.open)}
                onClick={onToggle}
            >
                {question}
            </div>
            {isOpen && <div className={styles["accordion-answer"]}>{answer}</div>}
        </div>
    );
};

AccordionItem.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
};

const Accordion = ({ items, className }) => {
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleItem = (index) => {
        setOpenIndexes((prevOpenIndexes) =>
            prevOpenIndexes.includes(index)
                ? prevOpenIndexes.filter((i) => i !== index)
                : [...prevOpenIndexes, index]
        );
    };

    useEffect(() => {
        setOpenIndexes([]);
    }, [items]);

    const accordionClassNames = classNames(styles["accordion"], className);

    return (
        <div className={accordionClassNames}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndexes.includes(index)}
                    onToggle={() => toggleItem(index)}
                />
            ))}
        </div>
    );
};

Accordion.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string,
            answer: PropTypes.string,
        })
    ),
    className: PropTypes.string,
};

export default Accordion;
