import React, { useState } from 'react';


const SizeGuide = () => {
    const [unit, setUnit] = useState('in'); // 'in' or 'cm'

    // Conversion helper
    const convert = (inches) => {
        return unit === 'cm' ? Math.round(inches * 2.54) : inches;
    };

    return (
        <div className="size-guide-page">
            <div className="container">

                <div className="size-guide-header">
                    <h1 className="size-guide-title">Size & Fit Guide</h1>
                    <p className="size-guide-subtitle">Find your perfect fit with our detailed measurement breakdowns.</p>
                </div>

                <div className="measurement-toggle">
                    <button
                        className={`toggle-btn ${unit === 'in' ? 'active' : ''}`}
                        onClick={() => setUnit('in')}
                    >
                        INCHES
                    </button>
                    <button
                        className={`toggle-btn ${unit === 'cm' ? 'active' : ''}`}
                        onClick={() => setUnit('cm')}
                    >
                        CENTIMETERS
                    </button>
                </div>

                <div className="size-tables-container">

                    {/* TOPS TABLE */}
                    <section className="size-section">
                        <h2>Tops & Outerwear</h2>
                        <div className="size-table-wrapper">
                            <table className="size-table">
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Chest ({unit})</th>
                                        <th>Waist ({unit})</th>
                                        <th>Arm Length ({unit})</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>XS</td><td>{convert(34)} - {convert(36)}</td><td>{convert(28)} - {convert(30)}</td><td>{convert(32)}</td></tr>
                                    <tr><td>S</td><td>{convert(36)} - {convert(38)}</td><td>{convert(30)} - {convert(32)}</td><td>{convert(33)}</td></tr>
                                    <tr><td>M</td><td>{convert(38)} - {convert(40)}</td><td>{convert(32)} - {convert(34)}</td><td>{convert(34)}</td></tr>
                                    <tr><td>L</td><td>{convert(40)} - {convert(42)}</td><td>{convert(34)} - {convert(36)}</td><td>{convert(35)}</td></tr>
                                    <tr><td>XL</td><td>{convert(42)} - {convert(44)}</td><td>{convert(36)} - {convert(38)}</td><td>{convert(36)}</td></tr>
                                    <tr><td>XXL</td><td>{convert(44)} - {convert(46)}</td><td>{convert(38)} - {convert(40)}</td><td>{convert(36.5)}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* BOTTOMS TABLE */}
                    <section className="size-section">
                        <h2>Pants & Shorts</h2>
                        <div className="size-table-wrapper">
                            <table className="size-table">
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Waist ({unit})</th>
                                        <th>Hip ({unit})</th>
                                        <th>Inseam ({unit})</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>28</td><td>{convert(29)}</td><td>{convert(36)}</td><td>{convert(32)}</td></tr>
                                    <tr><td>30</td><td>{convert(31)}</td><td>{convert(38)}</td><td>{convert(32)}</td></tr>
                                    <tr><td>32</td><td>{convert(33)}</td><td>{convert(40)}</td><td>{convert(32)}</td></tr>
                                    <tr><td>34</td><td>{convert(35)}</td><td>{convert(42)}</td><td>{convert(34)}</td></tr>
                                    <tr><td>36</td><td>{convert(37)}</td><td>{convert(44)}</td><td>{convert(34)}</td></tr>
                                    <tr><td>38</td><td>{convert(39)}</td><td>{convert(46)}</td><td>{convert(34)}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>

                {/* HOW TO MEASURE SECTION */}
                <div className="how-to-measure">
                    <div className="measure-text">
                        <h3>How to Measure</h3>

                        <div className="measure-step">
                            <h4>Chest</h4>
                            <p>Measure under your arms, around the fullest part of your chest. Keep the tape level across your back and comfortably loose.</p>
                        </div>

                        <div className="measure-step">
                            <h4>Waist</h4>
                            <p>Measure around your natural waistline, keeping the tape comfortably loose.</p>
                        </div>

                        <div className="measure-step">
                            <h4>Inseam</h4>
                            <p>Measure from the top of your inner thigh down to the bottom of your ankle.</p>
                        </div>

                        <div className="measure-step">
                            <h4>Arm Length</h4>
                            <p>Bend your elbow slightly. Measure from the center back of your neck, across your shoulder, down to your wrist.</p>
                        </div>
                    </div>

                    <div className="measure-visual">
                        {/* Replace the src URL with the actual URL of the image you generate */}
                        <img
                            src="src\assets\images\Sizechart.png" alt="size chart"

                            
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SizeGuide;